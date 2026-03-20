<script>
	import { docStore } from "$lib/firestore";
	const vars = docStore("variables/global");
</script>

<div>
	{#if $vars === null} <p>Loading...</p> {:else} <p>{$vars.test}</p> {/if}
</div>

<style>

</style>