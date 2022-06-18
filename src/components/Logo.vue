<template>
	<g-link class="logo">
	  <span class="logo__text" 
            @click="hasHistory() 
                    ? $router.go(-1) 
                    : $router.push('/')"
        >
	    &larr; {{ $static.metadata.siteName }}
	  </span>
	</g-link>
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
        methods: {
            hasHistory () { return window.history.length > 2 }
        }
    } 
</script>

<style lang="scss">
.logo {
	text-decoration: none;
  color: var(--body-color)!important;
  font-size: .9em;

	&__image {
		vertical-align: middle;
		height: 42.8px;
		width: 40px;
		margin-right: .5em;
        margin-bottom: 2vh;
	}
}
</style>
