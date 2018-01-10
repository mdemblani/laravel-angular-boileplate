<?php

namespace Angular\Commands;

use Angular\Commands\MakeCommand;

class ServiceMakeCommand extends MakeCommand {

	/**
	 * The name and signature of the console command.
	 * @var string
	 */
	protected $signature = 'angular:service {name}
							{--module= : The name of the angular application }
							{--desc= : The service description }';

	/**
	 * The console command description.
	 * @var string
	 */
	protected $description = 'Generate a AngularJS 1.x ES6 Service.';

	/**
	 * Get the stub file for the generator.
	 * @return string
	 */
	protected function getStub() {
		return __DIR__ . '/stubs/service/service.js';
	}

}
