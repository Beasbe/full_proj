<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;
    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationGroup = 'Контент';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Проект')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Основное')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->label('Название проекта')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $state, Forms\Set $set) => 
                                        $set('slug', Str::slug($state))),
                                
                                Forms\Components\TextInput::make('slug')
                                    ->label('URL (slug)')
                                    ->required()
                                    ->unique(ignoreRecord: true),
                                
                                Forms\Components\TextInput::make('year')
                                    ->label('Год реализации')
                                    ->required()
                                    ->numeric()
                                    ->default(date('Y')),
                                
                                Forms\Components\TextInput::make('location')
                                    ->label('Местоположение')
                                    ->required(),
                                
                                Forms\Components\Select::make('category')
                                    ->label('Категория')
                                    ->options([
                                        'Телефония' => 'Телефония',
                                        'СКС' => 'СКС',
                                        'Комплексные решения' => 'Комплексные решения',
                                        'Поставки' => 'Поставки',
                                        'АТС' => 'АТС',
                                        'Проектирование' => 'Проектирование',
                                    ])
                                    ->required(),
                                
                                Forms\Components\TextInput::make('client')
                                    ->label('Клиент')
                                    ->required(),
                                
                                Forms\Components\TextInput::make('duration')
                                    ->label('Срок выполнения')
                                    ->required(),
                                
                                Forms\Components\TextInput::make('sort_order')
                                    ->label('Порядок сортировки')
                                    ->numeric()
                                    ->default(0),
                                
                                Forms\Components\Toggle::make('is_published')
                                    ->label('Опубликовано')
                                    ->default(true),
                            ]),
                        
                        Forms\Components\Tabs\Tab::make('Описание')
                            ->schema([
                                Forms\Components\Textarea::make('short_description')
                                    ->label('Краткое описание')
                                    ->required()
                                    ->rows(3)
                                    ->columnSpanFull(),
                                
                                Forms\Components\RichEditor::make('full_description')
                                    ->label('Полное описание')
                                    ->required()
                                    ->fileAttachmentsDisk('public')
                                    ->fileAttachmentsDirectory('projects')
                                    ->columnSpanFull(),
                            ]),
                        
                        Forms\Components\Tabs\Tab::make('Детали')
                            ->schema([
                                Forms\Components\TagsInput::make('technologies')
                                    ->label('Технологии')
                                    ->separator(',')
                                    ->placeholder('Введите технологию и нажмите Enter')
                                    ->columnSpanFull(),
                                
                                Forms\Components\TagsInput::make('challenges')
                                    ->label('Сложности/Задачи')
                                    ->separator(',')
                                    ->placeholder('Введите задачу и нажмите Enter')
                                    ->columnSpanFull(),
                                
                                Forms\Components\TagsInput::make('results')
                                    ->label('Результаты')
                                    ->separator(',')
                                    ->placeholder('Введите результат и нажмите Enter')
                                    ->columnSpanFull(),
                            ]),
                        
                        Forms\Components\Tabs\Tab::make('Изображение')
                            ->schema([
                                Forms\Components\FileUpload::make('image')
                                    ->label('Изображение проекта')
                                    ->image()
                                    ->disk('public')
                                    ->directory('projects/images')
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
                    ->label('Название')
                    ->searchable()
                    ->limit(50),
                
                Tables\Columns\TextColumn::make('client')
                    ->label('Клиент')
                    ->searchable(),
                
                Tables\Columns\TextColumn::make('category')
                    ->label('Категория')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Телефония' => 'info',
                        'СКС' => 'success',
                        'Комплексные решения' => 'warning',
                        'АТС' => 'danger',
                        default => 'gray',
                    }),
                
                Tables\Columns\TextColumn::make('year')
                    ->label('Год')
                    ->sortable(),
                
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Опубликовано')
                    ->boolean()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Порядок')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Категория')
                    ->options([
                        'Телефония' => 'Телефония',
                        'СКС' => 'СКС',
                        'Комплексные решения' => 'Комплексные решения',
                        'Поставки' => 'Поставки',
                        'АТС' => 'АТС',
                        'Проектирование' => 'Проектирование',
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
            ->defaultSort('sort_order');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }

    public static function getNavigationLabel(): string
    {
        return 'Проекты';
    }

    public static function getPluralLabel(): string
    {
        return 'Проекты';
    }
}