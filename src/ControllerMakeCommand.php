<?php

namespace Angular\Commands;

use Angular\Commands\MakeCommand;
use Illuminate\Console\Command;
use function config;

class ControllerMakeCommand extends MakeCommand {

	/**
	 * The name and signature of the console command.
	 * @var string
	 */
	protected $signature = 'angular:controller {name}
							{--module= : The name of the angular application }
							{--desc= : The controller description }';

	/**
	 * The console command description.
	 * @var string
	 */
	protected $description = 'Generate a AngularJS 1.x ES6 Controller.';

	/**
	 * Get the stub file for the generator.
	 * @return string
	 */
	protected function getStub() {
		return __DIR__ . '/stubs/controller/controller.js';
	}

}
