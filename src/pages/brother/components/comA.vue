<template>
    <div>
        <el-button type="info" @click='toggle'>toggleA</el-button>
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
            var me = this;
            Bus.$on('msgChangeA', (msg) =>{
                me.msg = msg;
            })
        },

        methods : {
            toggle () {
                this.msg = this.msg == 0 ? 1 : 0;
                Bus.$emit('msgChangeB', this.msg);      
            }
        }
    }
</script>