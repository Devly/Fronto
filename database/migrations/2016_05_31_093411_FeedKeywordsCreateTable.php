<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FeedKeywordsCreateTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('feed_keywords', function (Blueprint $table) {
			$table->increments('id');
			$table->string('keyword');
			$table->integer('feed_id')->unsigned();
		});
		Schema::table('feed_keywords', function(Blueprint $table) {
		$table->foreign('feed_id')->references('id')->on('feeds');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}
}
