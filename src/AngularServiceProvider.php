<?php

namespace Angular\Providers;

use Angular\Commands\ConstantMakeCommand;
use Angular\Commands\ControllerMakeCommand;
use Angular\Commands\GenerateCommand;
use Angular\Commands\ServiceMakeCommand;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\ServiceProvider;

class AngularServiceProvider extends ServiceProvider {

	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot() {
		$this->commands('angular.generate');
		$this->commands('angular.controller');
		$this->commands('angular.service');
		$this->commands('angular.constant');
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
		$this->app->singleton('angular.controller', function () {
			return new ControllerMakeCommand(new Filesystem);
		});
		$this->app->singleton('angular.service', function () {
			return new ServiceMakeCommand(new Filesystem);
		});
		$this->app->singleton('angular.constant', function () {
			return new ConstantMakeCommand(new Filesystem);
		});
	}

}
