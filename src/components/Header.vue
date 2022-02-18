<template>
	<div itemscope itemtype="https://schema.org/Person" id="landing" class="author">

		<g-image alt="Author image" class="author__image" src="~/assets/images/author.jpg" width="200" height="200" blur="5" />

		<h1 v-if="showTitle" class="author__site-title">
			{{ $static.metadata.siteName }}
		</h1>

		<p class="author__intro">
			Hello! I'm <span class="highlight" itemprop="name">Adewale "Ace" Abati</span>. A <span class="highlight" itemprop="jobTitle">Web Engineer & Developer Advocate</span>. I'm passionate about the web and it's infinite possibilities, <a href="https://github.com/acekyd" rel="noopener" target="_blank">Open Source</a>, sharing my experiences on <a href="https://youtube.com/acekyd" rel="noopener" target="_blank">YouTube</a> and playing <a href="https://www.twitch.tv/elpunish3rr">Video games</a>.<br /><br />

			I'm currently helping to shape cloud development on the Web at <a href="https://codesandbox.io/" rel="noopener" target="_blank">CodeSandbox</a> - helping web developers create, share and collaborate with ease!  <br />
			♠️
		</p>

		<p class="author_links small">
			Previously: <a href="https://flutterwave.com/">Flutterwave</a>, <a href="https://ingressive.co">Ingressive</a>, <a href="http://www.withpropel.com/">Hirefreehands (Propel)</a>, <a href="https://hotels.ng">HotelsNG</a>
		</p><br />

		<p class="author__links">
			<a href="https://github.com/acekyd/" target="_blank" rel="noopener">
	  			<font-awesome :icon="['fab', 'github']"/>
			</a>
			<a href="https://twitter.com/ace_kyd/" target="_blank" rel="noopener">
	  			<font-awesome :icon="['fab', 'twitter']"/>
			</a>
			<a href="https://twitch.tv/elpunish3rr/" target="_blank" rel="noopener">
	  			<font-awesome :icon="['fab', 'twitch']"/>
			</a>
			<a href="https://www.linkedin.com/in/acekyd/" target="_blank" rel="noopener">
	  			<font-awesome :icon="['fab', 'linkedin']"/>
			</a>
			<a href="https://stackoverflow.com/users/1945274/acekyd" target="_blank" rel="noopener">
	  			<font-awesome :icon="['fab', 'stack-overflow']"/>
			</a>
			<a href="https://www.youtube.com/acekyd/" target="_blank" rel="noopener">
	  			<font-awesome :icon="['fab', 'youtube']"/>
			</a>
		</p>

	</div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
	props: ['showTitle']
}
</script>

<style lang="scss">
#landing.author {
	margin: 0 auto;
	max-width: 700px;
	text-align: center;

	.author__image {
		border-radius: 100%;
		width: 100px;
		height: 100px;
		margin-bottom: 1em;
		margin-top: 1em;
	}

	.author__intro {
		font-size: 1rem;
		// line-height: 2rem;
		// opacity: .8;
	}

	.author__site-title {
		font-size: 1.2em;
	}

	.author__links {
		margin-top: -.5em;
		a {
			margin: 0 .5em;
		}

	}
	.strike {
		text-decoration: line-through;
	}

	.small {
		font-size: 0.7em;
	}
}
</style>
