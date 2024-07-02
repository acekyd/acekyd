<template>
    <blockquote class="twitter-tweet">
        <a :href="`https://twitter.com/user/status/${tweetId}`"></a>
    </blockquote>
</template>

<script>
export default {
    props: {
        tweetId: {
            type: String,
            required: true
        }
    },
    mounted() {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);
    }
};
</script>

<style scoped>
/* Add any necessary styling here */
.twitter-tweet {
    margin: 0 auto !important;
}
</style>