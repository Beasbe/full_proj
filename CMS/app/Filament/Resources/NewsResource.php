<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsResource\Pages;
use App\Models\News;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;
    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationGroup = 'Контент';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Контент')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Основное')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->label('Заголовок')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $state, Forms\Set $set) => 
                                        $set('slug', Str::slug($state))),
                                
                                Forms\Components\TextInput::make('slug')
                                    ->label('URL (slug)')
                                    ->required()
                                    ->unique(ignoreRecord: true),
                                
                                Forms\Components\DatePicker::make('date')
                                    ->label('Дата публикации')
                                    ->required()
                                    ->default(now()),
                                
                                Forms\Components\TextInput::make('year')
                                    ->label('Год')
                                    ->required()
                                    ->numeric()
                                    ->default(date('Y')),
                                
                                Forms\Components\Select::make('category')
                                    ->label('Категория')
                                    ->options([
                                        'Обновление' => 'Обновление',
                                        'Партнерство' => 'Партнерство',
                                        'Событие' => 'Событие',
                                        'Награда' => 'Награда',
                                        'Компания' => 'Компания',
                                        'Обучение' => 'Обучение',
                                        'Достижение' => 'Достижение',
                                        'Команда' => 'Команда',
                                        'Продукт' => 'Продукт',
                                        'Отчет' => 'Отчет',
                                        'Инфраструктура' => 'Инфраструктура',
                                    ])
                                    ->required(),
                                
                                Forms\Components\Toggle::make('is_published')
                                    ->label('Опубликовано')
                                    ->default(true),
                            ]),
                        
                        Forms\Components\Tabs\Tab::make('Контент')
                            ->schema([
                                Forms\Components\Textarea::make('excerpt')
                                    ->label('Краткое описание')
                                    ->required()
                                    ->rows(3)
                                    ->columnSpanFull(),
                                
                                Forms\Components\RichEditor::make('content')
                                    ->label('Полный текст')
                                    ->required()
                                    ->fileAttachmentsDisk('public')
                                    ->fileAttachmentsDirectory('news')
                                    ->columnSpanFull(),
                            ]),
                        
                        Forms\Components\Tabs\Tab::make('Изображение')
                            ->schema([
                                Forms\Components\FileUpload::make('image')
                                    ->label('Изображение')
                                    ->image()
                                    ->disk('public')
                                    ->directory('news/images')
                                    ->imageResizeMode('cover')
                                    ->imageCropAspectRatio('16:9')
                                    ->imageResizeTargetWidth('1200')
                                    ->imageResizeTargetHeight('675')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Изображение')
                    ->circular(),
                
                Tables\Columns\TextColumn::make('title')
                    ->label('Заголовок')
                    ->searchable()
                    ->limit(50),
                
                Tables\Columns\TextColumn::make('category')
                    ->label('Категория')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Обновление' => 'info',
                        'Партнерство' => 'success',
                        'Событие' => 'warning',
                        'Награда' => 'danger',
                        default => 'gray',
                    }),
                
                Tables\Columns\TextColumn::make('date')
                    ->label('Дата')
                    ->date('d.m.Y')
                    ->sortable(),
                
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Опубликовано')
                    ->boolean()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Категория')
                    ->options([
                        'Обновление' => 'Обновление',
                        'Партнерство' => 'Партнерство',
                        'Событие' => 'Событие',
                        'Награда' => 'Награда',
                        'Компания' => 'Компания',
                        'Обучение' => 'Обучение',
                        'Достижение' => 'Достижение',
                        'Команда' => 'Команда',
                        'Продукт' => 'Продукт',
                        'Отчет' => 'Отчет',
                        'Инфраструктура' => 'Инфраструктура',
                    ]),
                
                Tables\Filters\Filter::make('is_published')
                    ->label('Только опубликованные')
                    ->query(fn ($query) => $query->where('is_published', true)),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('date', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNews::route('/'),
            'create' => Pages\CreateNews::route('/create'),
            'edit' => Pages\EditNews::route('/{record}/edit'),
        ];
    }

    public static function getNavigationLabel(): string
    {
        return 'Новости';
    }

    public static function getPluralLabel(): string
    {
        return 'Новости';
    }
}