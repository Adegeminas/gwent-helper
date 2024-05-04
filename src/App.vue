<script setup lang="ts">
import { ref } from 'vue';
import DeckConstructor from './components/DeckConstructor.vue';
import DeckTracker from './components/DeckTracker.vue';
import OppTracker from './components/OppTracker.vue';

const currentTab = ref(0);
</script>

<template>
	<v-tabs v-model="currentTab">
		<v-tab>Tracker</v-tab>
		<v-tab>Contructor</v-tab>
	</v-tabs>

	<div v-if="currentTab === 0" class="main-2">
		<DeckTracker />
	</div>

	<div v-if="currentTab === 1" class="main-1">
		<DeckConstructor />
	</div>
</template>

<style scoped>
.main-1 {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
}
.main-2 {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
}
.v-tabs {
	width: 100%;
	margin-bottom: 20px;
	.v-tab {
		height: 40px;
	}
}
</style>
