<template>
	<div id="landing" class="author">

		<g-image alt="Author image" class="author__image" src="~/assets/images/author.png" width="200" height="200" blur="5" />

		<h1 v-if="showTitle" class="author__site-title">
			{{ $static.metadata.siteName }}
		</h1>

		<p class="author__intro">
			Hi! I'm <span class="highlight">Adewale Abati</span> a.k.a <b>Ace</b>. A Web Developer (PHP, JS, ...Web), Developer Advocate, <a href="https://github.com/acekyd" rel="noopener" target="_blank">Open Sourcer</a>, <a href="https://youtube.com/acekyd" rel="noopener" target="_blank">Tech YouTuber</a> and <a href="https://www.twitch.tv/elpunish3rr">Gamer</a>.<br />

			Currently Acing <span class="strike">Shii</span> things up as <strong>Developer Advocate</strong> at <a href="https://flutterwave.com/" rel="noopener" target="_blank">Flutterwave</a> - bringing amazing payment solutions and innovations to developers all over the world!  <br />
			♠️
		</p>

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
	max-width: 900px;
	text-align: center;
	padding: calc(var(--space) / 2) 0;

	.author__image {
		border-radius: 100%;
		width: 150px;
		height: 150px;
		margin-bottom: 1em;
	}

	.author__intro {
		font-size: 1.1rem;
		line-height: 2rem;
		// opacity: .8;
	}

	.author__site-title {
		font-size: 1.5em;
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
}
</style>
