<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FeedPostsCreateTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('feed_posts', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('feed_id')->unsigned();
			$table->string('title');
			$table->string('permalink');
			$table->mediumText('description');
			$table->timestamps();
			$table->timestamp('published_at');
		});
		Schema::table('feed_posts', function (Blueprint $table) {
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
		Schema::drop('feed_posts');
	}
}
