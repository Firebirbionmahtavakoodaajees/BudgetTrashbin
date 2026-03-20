<script>
	import { docStore } from "$lib/firestore";
	export const vars = docStore("variables/global");
</script>

<div>
	{#if $vars === null} Loading... {:else} - {/if}
</div>

<style>

</style>