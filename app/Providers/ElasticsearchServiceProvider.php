<?php

namespace App\Providers;

use App\Scout\ElasticsearchEngine;
use Elasticsearch\Client as Elasticsearch;
use Elasticsearch\ClientBuilder as ElasticsearchBuilder;
use Illuminate\Support\ServiceProvider;
use Laravel\Scout\EngineManager;

class ElasticsearchServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Elasticsearch::class, function ($app) {
            return ElasticsearchBuilder::create()
                ->setHosts(config('scout.elasticsearch.hosts'))
                ->build();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        resolve(EngineManager::class)->extend('elasticsearch', function () {
            return new ElasticsearchEngine(resolve(Elasticsearch::class));
        });
    }
}
