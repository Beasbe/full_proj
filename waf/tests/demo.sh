#!/usr/bin/env bash
# =============================================================================
#  Наглядная демонстрация работы WAF (ModSecurity + OWASP CRS), вариант 4.
#
#  Прогоняет 4 сценария и после блокировок печатает строку из audit-лога WAF
#  с ID сработавшего правила, чтобы было видно, ЧТО именно заблокировало запрос.
#
#  Запуск:  ./waf/tests/demo.sh [base-url]
# =============================================================================
set -u

BASE="${1:-http://localhost:8080}"
WAF="modsecurity-waf"
CHROME="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

if [ -t 1 ]; then
    GREEN=$'\033[32m'; RED=$'\033[31m'; CYAN=$'\033[1;36m'; DIM=$'\033[2m'; RST=$'\033[0m'
else
    GREEN=""; RED=""; CYAN=""; DIM=""; RST=""
fi

hdr() { printf '\n%s%s%s\n' "$CYAN" "$1" "$RST"; }

# run <описание> <аргументы curl...> — печатает строку со статусом
run() {
    local desc="$1"; shift
    local code
    code=$(curl -s -o /dev/null -w '%{http_code}' "$@")
    local color="$GREEN"
    case "$code" in 403|429) color="$RED";; esac
    printf '  • %s  →  %sHTTP %s%s\n' "$desc" "$color" "$code" "$RST"
    LAST_CODE="$code"
}

# show_waf_log — последняя строка блокировки из audit-лога WAF
show_waf_log() {
    printf '%s  ↳ audit-лог WAF:%s\n' "$DIM" "$RST"
    docker logs "$WAF" --since 6s 2>&1 \
        | grep -a 'ModSecurity: Access denied' | tail -1 \
        | sed 's/.*ModSecurity: /    ModSecurity: /' \
        | sed -E 's/ \[hostname.*//' | cut -c1-190
    docker logs "$WAF" --since 6s 2>&1 \
        | grep -a '"ruleId"' | tail -1 \
        | sed -E 's/.*"ruleId":"([0-9]+)".*/    → id="\1"/'
}

printf '%s\n' "=============================================================================="
printf ' WAF demo — %s  (ModSecurity + OWASP CRS)\n' "$BASE"
printf '%s\n' "=============================================================================="

hdr "[1] Легитимный трафик — НЕ блокируется"
run "обычный браузер (Chrome)"            -A "$CHROME" "$BASE/"
run "Firefox"                             -A "Mozilla/5.0 (Windows NT 10.0) Gecko/20100101 Firefox/121.0" "$BASE/"
run "JSON API /api/news"                  -A "$CHROME" "$BASE/api/news"
run "статический ресурс /favicon.ico"     -A "$CHROME" "$BASE/favicon.ico"

hdr "[2] Сканеры уязвимостей и ботнеты — блокирует ПРАВИЛО 1000001 (по User-Agent)"
run "sqlmap"      -A "sqlmap/1.7.2#stable" "$BASE/"
run "Nikto"       -A "Mozilla/5.00 (Nikto/2.1.6) (Evasions:None)" "$BASE/"
run "masscan"     -A "masscan/1.3" "$BASE/"
run "Nuclei"      -A "Nuclei - Open-source project" "$BASE/"
run "nmap NSE"    -A "Mozilla/5.0 (compatible; Nmap Scripting Engine)" "$BASE/"
show_waf_log

hdr "[3] Классические веб-атаки — блокирует OWASP CRS"
run "SQL-инъекция  ?id=1' OR '1'='1"       -A "$CHROME" "$BASE/?id=1%27%20OR%20%271%27%3D%271"
show_waf_log
run "XSS           ?q=<script>alert(1)</>" -A "$CHROME" "$BASE/?q=<script>alert(1)</script>"
show_waf_log
run "Path traversal ?file=../../etc/passwd" -A "$CHROME" "$BASE/?file=../../etc/passwd"
run "Command inj.   ?cmd=;cat /etc/passwd"  -A "$CHROME" "$BASE/?cmd=;cat%20/etc/passwd"

hdr "[4] L7-DDoS: аномальная частота запросов к статике — rate limit (HTTP 429)"
printf '  %sзапускаю 500 запросов к /favicon.ico в 50 потоков...%s\n' "$DIM" "$RST"
python3 "$(dirname "$0")/ddos_static.py" --url "$BASE/favicon.ico" --requests 500 --concurrency 50
printf '  %s↳ лог nginx (limit_req):%s\n' "$DIM" "$RST"
docker logs "$WAF" --since 6s 2>&1 | grep -a 'limiting requests' | tail -1 | sed 's/^/    /'

printf '\n%sГотово. Живой просмотр логов WAF:  docker logs -f %s%s\n' "$CYAN" "$WAF" "$RST"
