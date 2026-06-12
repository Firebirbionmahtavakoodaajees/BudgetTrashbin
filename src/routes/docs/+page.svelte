<script>


	/* Imports */

	//Import firestore
	import { docStore } from "$lib/firestore.js";
	const vars = docStore("variables/global");

	/* Variables */
	//$ Makes Sveltes live variable
	//You can theoretically just do:

	/*
	$: TestContributions1 = vars.contributions;
	*/

	//But in reality to avoid website crashing if the entry is null, use:
	$: TestContributions2 = $vars?.contributions ?? [];
	//So if it returns null use [].

	//Let's display and use the variables in html section *1:

</script>

This is a page for the developer of this website to document code and save anything, for example style sheets or datatables.

<br>

Because websites are segmented in code, I'll mark different segments continuation with *, so for example *1 and *1 go together.

<br>

<!-- *1 Display the variables :-->
<!-- Because contributions is an array table, we have to display that, this is how we do that: -->
<!-- First we have to set if the table is empty just in case: -->
{#if TestContributions2.length === 0} <!--{#something} in html gives it js functionalities. -->
<!-- Remember that == compares value not the type so a int and a string can match, === has to have same type-->


	No contributions found

{:else}

	<!-- Displaying the table: -->
	{#each TestContributions2 as contrib (contrib.id)}
	<!-- each: each means each and every, so we go down the list of contributors and read their info one by one. -->
	<!-- as contrib: contrib is a temp variable, as it goes down the list, it assigns the next contribution as contrib, IDK why cant it just do this without this variable, ig its useful sometimes -->
	<!-- We assign ids so the order of a array doesnt matter. Here we just use the id to know if I'm manipulating this id so the others stay untouched. This is important cuz otherwise it would have to rebuild the whole thing every time i touch. -->
	<!-- Metatext -->
		{contrib.contributor} contributed {contrib.amount} at {contrib.date}
	{/each}


{/if}

<br>
But a simple variable can just be parsed and displayed as &lcub;variablename&rcub;.



<style>

</style>