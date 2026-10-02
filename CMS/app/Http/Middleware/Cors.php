<?php
namespace App\Http\Middleware;

use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
        // Список разрешённых Origin задаётся через env CORS_ALLOWED_ORIGINS
        // (см. config/cors.php). Хардкода IP конкретного стенда быть не должно.
        $allowedOrigins = (array) config('cors.allowed_origins', ['http://localhost:3000']);

        $origin = $request->headers->get('Origin');
        $allowOrigin = in_array($origin, $allowedOrigins, true) ? $origin : ($allowedOrigins[0] ?? '');

        if ($request->isMethod('OPTIONS')) {
            return response('', 204)
                ->header('Access-Control-Allow-Origin', $allowOrigin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization')
                ->header('Access-Control-Max-Age', '86400');
        }

        return $next($request)
            ->header('Access-Control-Allow-Origin', $allowOrigin)
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
    }
}
