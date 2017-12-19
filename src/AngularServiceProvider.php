<?php

namespace Angular\Providers;

use Angular\Commands\GenerateCommand;
use Illuminate\Support\ServiceProvider;

class AngularServiceProvider extends ServiceProvider {

	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot() {
		$this->commands('angular.generate');
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register() {
		$this->registerAngularCommand();
	}

	/**
	 * Register the Artisan command.
	 */
	protected function registerAngularCommand() {
		$this->app->singleton('angular.generate', function () {
			return new GenerateCommand();
		});
	}

}
