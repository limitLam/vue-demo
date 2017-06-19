<template>
    <div>
        <el-button type="success" @click='toggle'>toggleB</el-button>
        <div>{{ msg }}</div>
    </div>
</template>
<script>
    import Bus from 'UTILS/bus'
    export default {
        data () {
            return {
                msg : 0
            }
        },

        mounted () {
            Bus.$on('msgChange', (msg) => {
                this.msg = msg;
            });
        },

        methods : {
            toggle () {
                const msg = this.msg == 0 ? 1 : 0;
                Bus.$emit('msgChange', msg);     
            }
        }
    }
</script>