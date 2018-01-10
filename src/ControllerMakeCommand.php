<?php

namespace Angular\Commands;

use Illuminate\Console\Command;
use function config;

class ControllerMakeCommand extends Command {

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
	 * The instance to the Filesystem class
	 * @var Filesystem
	 */
	private $filesystem;

	/**
	 * Create a new command instance.
	 * @return void
	 */
	public function __construct(\Illuminate\Filesystem\Filesystem $filesystem) {
		parent::__construct();
		$this->filesystem = $filesystem;
	}

	/**
	 * Get the desired class name from the input.
	 * @return string
	 */
	protected function getNameInput() {
		return trim($this->argument('name'));
	}

	/**
	 * Get the Module Name
	 * @return string|array
	 */
	private function getModuleName(): string {
		return trim($this->option('module') ?? env('ANGULAR_APP_NAME', config('app.name')));
	}

	/**
	 * Get the controller description from the users input
	 * @return string|array
	 */
	private function getControllerDescription() {
		return trim($this->option('desc') ?? 'Controller Description');
	}

	/**
	 * Get the path where the scripts are stored for the laravel application
	 * @return string
	 */
	private function getScriptPath(): string {
		return trim(env('ANGULAR_SCRIPT_PATH', resource_path('js')));
	}

	/**
	 * Returns the absolute path where the script needs to be added
	 * @return string|array
	 */
	protected function getPath() {
		$name = $this->getNameInput();
		$path = $this->getScriptPath() . DIRECTORY_SEPARATOR . $name . '.js';
		return $path;
	}

	/**
	 * Get the stub file for the generator.
	 * @return string
	 */
	protected function getStub() {
		return __DIR__ . '/stubs/controller/controller.js';
	}

	/**
	 * Replace the DUMMYMODULENAME string in the stub provided with the name of the module
	 * @param string $stub
	 * @param string $name
	 * @return string
	 */
	protected function replaceModuleName(&$stub, $name) {
		$stub = str_replace(['DUMMYMODULENAME'], [$name], $stub);
		return $stub;
	}

	/**
	 * Replace the DUMMYCONTROLLER string in the stub provided with the name of the controller
	 * @param string $stub
	 * @param string $name
	 * @return string
	 */
	protected function replaceControllerName(&$stub, $name) {
		$stub = str_replace(['DUMMYCONTROLLER'], [$name], $stub);
		return $stub;
	}

	/**
	 * Replace the DUMMYCONTROLLERDESCRIPTION string in the stub provided with the description of the controller
	 * @param string $stub
	 * @param string $name
	 * @return string
	 */
	protected function replaceControllerDescription(&$stub, $name) {
		$stub = str_replace(['DUMMYCONTROLLERDESCRIPTION'], [$name], $stub);
		return $stub;
	}

	/**
	 * Determine if the class already exists.
	 * @param  string  $path
	 * @return bool
	 */
	protected function alreadyExists($path) {
		return $this->filesystem->exists($path);
	}

	/**
	 * Build the directory for the class if necessary.
	 * @param  string  $path
	 * @return string
	 */
	protected function makeDirectory(string $path): string {
		if (!$this->filesystem->isDirectory(dirname($path))) {
			$this->filesystem->makeDirectory(dirname($path), 0777, true, true);
		}
		return $path;
	}

	/**
	 * Normalize the name received to camelCase
	 * @param string $name
	 * @return string
	 */
	private function normalize($name): string {
		return \Illuminate\Support\Str::camel($name);
	}

	/**
	 * Build the angular controller
	 * @param string $path
	 * @return string
	 */
	protected function buildController($path) {
		// Get the filename from the path
		$filename = $this->filesystem->name($path);
		// Normalize the name
		$name = $this->normalize($filename);
		// Get the stub
		$stub = $this->filesystem->get($this->getStub());
		$stub = $this->replaceControllerName($stub, $name);
		$stub = $this->replaceModuleName($stub, $this->getModuleName());
		$stub = $this->replaceControllerDescription($stub, $this->getControllerDescription());
		return $stub;
	}

	/**
	 * Execute the console command.
	 */
	public function handle() {

		// Set the complete name of the file with the entire path
		// Get the path to the directory
		$path = $this->getPath();

		// First we will check to see if the controller already exists. If it does, we don't want
		// to create the class and overwrite the user's code. So, we will bail out so the
		// code is untouched. Otherwise, we will continue generating this class' files.
		if ($this->alreadyExists($path)) {
			$this->error($this->type . ' already exists!');
			return false;
		}

		// Next, we will generate the path to the location where this controller file should get
		// written. Then, we will build the controller and make the proper replacements on the
		// stub files so that it gets the correctly formatted namespace and class name.
		$this->makeDirectory($path);
		$this->filesystem->put($path, $this->buildController($path));
	}

}
