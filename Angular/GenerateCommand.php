<?php

namespace App\Console\Commands\Angular;

use Illuminate\Console\Command;
use function config;

class GenerateCommand extends Command {

	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'angular:generate
							{--name= : The name of the angular application }
							{--desc= : The description of the angular application }
							{--partial-path= : The path inside resources view where AngularJS templates would be present }
							{--script-path= : The path inside resources where AngularJS templates would be present }';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Generate a AngularJS 1.x ES6 boilerplate.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct() {
		parent::__construct();
	}

	private function getAppName() {
		return trim($this->option('name') ?? config('app.name'));
	}

	private function getAppDescription() {
		return trim($this->option('desc') ?? null);
	}

	private function getScriptPath() {
		$path = trim($this->option('script-path') ?? Angular::SCRIPT_DIRECTORY);
		return $path;
	}

	private function getPartialPath() {
		$path = trim($this->option('partial-path'));
		return $path;
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle() {
		// Get the app name
		$this->install();
	}

	public function install() {
		$options = [
			'partial' => $this->getPartialPath(),
			'script' => $this->getScriptPath()
		];
		$angular = new Angular($this->getAppName(), $this->getAppDescription(), $options);
		$angular->install();
	}

}
