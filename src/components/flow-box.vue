<template>
    <div class="flow-box">
        <span class="flow-box-item2"></span><span class="flow-box-item2"></span><span class="flow-box-item2"></span><span class="flow-box-item2"></span>
        <slot style="flex: 1;"></slot>
    </div>
</template>
<script setup>
</script>
<style scoped>
.flow-box {
    flex: 1; 
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    padding: 2px;
    box-sizing: border-box;
}
.flow-box-item:nth-child(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    position: absolute;
    background: linear-gradient(90deg, transparent 0%, #FFFFFF 10%, #3083FF 50%, #FFFFFF 90%, transparent 100%);
    animation: flowAnimate1 8s linear infinite;
}
@keyframes flowAnimate1 {
    0% {
    left: -100%;
    }
    50%,
    100% {
    left: 100%;
    }
}
.flow-box-item:nth-child(2) {
    top: -100%;
    right: 0;
    width: 3px;
    height: 100%;
    position: absolute;
    background: linear-gradient(180deg, transparent 10%, #FFFFFF 10%, #3083FF 50%, #FFFFFF 90%, transparent 100%);
    animation: flowAnimate2 8s linear infinite;
    animation-delay: 2s;
}

@keyframes flowAnimate2 {
    0% {
    top: -100%;
    }

    50%,
    100% {
    top: 100%;
    }
}
.flow-box-item:nth-child(3) {
    bottom: 0;
    right: 0;
    width: 100%;
    position: absolute;
    background: linear-gradient(270deg, transparent 10%, #FFFFFF 10%, #3083FF 50%, #FFFFFF 90%, transparent 100%);
    animation: flowAnimate3 8s linear infinite;
    animation-delay: 4s;
}

@keyframes flowAnimate3 {
    0% {
    right: -100%;
    height: 3px;
    }

    50%,
    100% {
    height: 2px;
    right: 100%;
    }
}
.flow-box-item:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 3px;
    position: absolute;
    height: 100%;
    background: linear-gradient(360deg, transparent 10%, #FFFFFF 10%, #3083FF 50%, #FFFFFF 90%, transparent 100%);
    animation: flowAnimate4 8s linear infinite;
    animation-delay: 6s;
}

@keyframes flowAnimate4 {
    0% {
    bottom: -100%;
    }
    50%,
    100% {
    bottom: 100%;
    }
}

</style>