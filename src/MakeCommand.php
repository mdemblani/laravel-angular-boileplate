<?php

namespace Angular\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;
use function config;
use function env;
use function resource_path;

abstract class MakeCommand extends Command {

	/**
	 * The instance to the Filesystem class
	 * @var Filesystem
	 */
	protected $filesystem;

	/**
	 * The type of class being generated.
	 * @var string
	 */
	protected $type;

	/**
	 * Create a new command instance.
	 * @return void
	 */
	public function __construct(Filesystem $filesystem) {
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
	protected function getModuleName(): string {
		return trim($this->option('module') ?? env('ANGULAR_APP_NAME', config('app.name')));
	}

	/**
	 * Get the controller description from the users input
	 * @return string|array
	 */
	protected function getClassDescription() {
		return trim($this->option('desc') ?? 'Description');
	}

	/**
	 * Get the path where the scripts are stored for the laravel application
	 * @return string
	 */
	protected function getScriptPath(): string {
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
	abstract protected function getStub();

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
	 * Replace the DUMMYCLASS string in the stub provided with the name of the class
	 * @param string $stub
	 * @param string $name
	 * @return string
	 */
	protected function replaceClassName(&$stub, $name) {
		$stub = str_replace(['DUMMYCLASS'], [$name], $stub);
		return $stub;
	}

	/**
	 * Replace the DUMMYDESCRIPTION string in the stub provided with the description provided
	 * @param string $stub
	 * @param string $name
	 * @return string
	 */
	protected function replaceClassDescription(&$stub, $name) {
		$stub = str_replace(['DUMMYDESCRIPTION'], [$name], $stub);
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
		return Str::camel($name);
	}

	/**
	 * Build the angular controller
	 * @param string $path
	 * @return string
	 */
	protected function build($path) {
		// Get the filename from the path
		$filename = $this->filesystem->name($path);
		// Normalize the name
		$name = $this->normalize($filename);
		// Get the stub
		$stub = $this->filesystem->get($this->getStub());
		$stub = $this->replaceClassName($stub, $name);
		$stub = $this->replaceModuleName($stub, $this->getModuleName());
		$stub = $this->replaceClassDescription($stub, $this->getClassDescription());
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
		$this->filesystem->put($path, $this->build($path));
		$this->info($this->type . ' created successfully at ' . $path);
	}

}
