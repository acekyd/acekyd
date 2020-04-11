<template>
	<div id="landing" class="author">

		<g-image alt="Author image" class="author__image" src="~/assets/images/author.jpg" width="200" height="200" blur="5" />

		<h1 v-if="showTitle" class="author__site-title">
			{{ $static.metadata.siteName }}
		</h1>

		<p class="author__intro">
			Hi! I'm Ace! A Web Engineer, Tech YouTuber, Public speaker, an Open Source enthusiast and avid gamer! ♠️
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
.author {
	margin: 0 auto;
	max-width: 500px;
	text-align: center;
	padding: calc(var(--space) / 2) 0;

	&__image {
		border-radius: 100%;
		width: 90px;
		height: 90px;
		margin-bottom: 1em;
	}

	&__intro {
		opacity: .8;
	}

	&__site-title {
		font-size: 1.5em;
	}

	&__links {
		margin-top: -.5em;
		a {
			margin: 0 .5em;
		}
	}
}
</style>
