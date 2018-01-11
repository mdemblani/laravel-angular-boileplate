<?php

namespace Angular\Commands;

use Angular\Commands\MakeCommand;

class ConstantMakeCommand extends MakeCommand {

	/**
	 * The name and signature of the console command.
	 * @var string
	 */
	protected $signature = 'angular:constant {name}
							{--module= : The name of the angular application }
							{--desc= : The service description }';

	/**
	 * The console command description.
	 * @var string
	 */
	protected $description = 'Generate a AngularJS 1.x ES6 Constant.';

	/**
	 * {@inheritDoc}
	 */
	protected function getStub() {
		return __DIR__ . '/stubs/constant/constant.js';
	}

	/**
	 * Replace the DUMMYCONSTANT string in the stub provided with the name of the constant
	 * @param string $stub
	 * @param string $name
	 * @return string
	 */
	protected function replaceConstantName(&$stub, $name) {
		$stub = str_replace(['DUMMYCONSTANT'], [$name], $stub);
		return $stub;
	}

	/**
	 * {@inheritDoc}
	 */
	protected function build($path) {
		// Get the filename from the path
		$filename = $this->filesystem->name($path);
		// Normalize the name
		$name = $this->normalize($filename);

		// Get the stub
		$stub = $this->filesystem->get($this->getStub());
		$this->replaceConstantName($stub, $name);
		$stub = $this->replaceModuleName($stub, $this->getModuleName());
		$stub = $this->replaceClassDescription($stub, $this->getClassDescription());
		return $stub;
	}

}
