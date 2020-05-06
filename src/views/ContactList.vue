<template>
    <div>
        <!-- 联系人卡片 -->
        <van-contact-card
            :type="cardType"
            :name="currentContact.name"
            :tel="currentContact.tel"
            @click="showList = true"
        />
        <!-- 联系人列表 -->
        <van-popup v-model="showList" position="bottom">
            <van-contact-list
                v-model="chosenContactId"
                :list="list"
                @add="onAdd"
                @edit="onEdit"
                @select="onSelect"
            />
        </van-popup>
        <!-- 联系人编辑 -->
        <van-popup v-model="showEdit" position="bottom">
            <van-contact-edit
                :contact-info="editingContact"
                :is-edit="isEdit"
                @save="onSave"
                @delete="onDelete"
            />
        </van-popup>
    </div>
</template>

<script>
// import Vue from 'vue';
import Zxios from '@/api/zxios/Zxios'
    export default {
        data() {
            return {
                list: [],
                showList: false,
                showEdit: false,
                editingContact: {},
                isEdit: false,
                chosenContactId: null
                
            }           
        },
        created() {
            this.getList()
        },
        computed: {
            cardType() {
                return this.chosenContactId !==null ? 'edit' : 'add'
            },
            currentContact() {
                return this.chosenContactId !==null ? this.list.filter( v => v.id === this.chosenContactId)[0] : {}
            }
        },
        methods: {
            // this.$axios.method(url, data, isFormData)  原生axios直接使用
            // this.$Http.methodAndUrlObj(data,isFormData) 将axios封装成一个$Http, 简化写法
            // Zxios.method(url, data, isFormData)  将原声Ajax封装成一个自己的Zxios,

            async getList() {
                // let res = await this.$axios.get('contactList') 
                // let res = await this.$Http.getContactList()
                let res = await Zxios.get("contactList")
                console.log(res)               
                this.list = res.data

                // this.$Http.getContactList().then( res => {
                //         console.log(res)
                //         // this.list = res.data
                //     }).catch( err => {
                //         console.log(err)
                //     })

                // 可用  Vue.axios window.axios 代替this.$axios
                // this.$axios.get('contactList').then( res => {
                //     console.log(res)
                //     // this.list = res.data.data
                //     // this.chosenContactId =  this.list.length > 0 ? this.list[0].id : null
                // }).catch( err => {
                //     console.log(err)
                // })
            },
            // 选中联系人
            onSelect() {
                this.showList = false;
            },
            onAdd() {
                // this.editingContact = { id: this.list.length };
                this.editingContact = {};
                this.showEdit =  true
                this.isEdit = false
            },
            onEdit(item) {
                this.showEdit =  true
                this.isEdit = true
                this.editingContact = item
            },
            onSave(info) {
                // if (this.isEdit) {
                //     this.list = this.list.map(item => item.id === info.id ? info : item);
                // } else {
                //     this.list.push(info);
                // }
                // this.chosenContactId = info.id;             
                if (this.isEdit) {
                    // this.$axios.put('contact/edit',info)
                    this.$Http.editContact(info)
                        .then( res => {
                            console.log(res)
                            // this.chosenContactId = info.id;
                            this.getList()
                            this.showEdit =  false
                            // this.showList = false
                        })
                } else {
                    // post方式  application/json
                    
                    // this.$axios.post('contact/add/json',info)
                    // this.$Http.addContactJson(info)
                    // Zxios.post('contact/add/json',info)
                    //     .then( res => {
                    //         console.log(res)
                    //         // this.chosenContactId = info.id;
                    //         this.getList()
                    //         this.showEdit =  false
                    //         // this.showList = false
                    //     })

                    // post方式  form-data

                    // this.$Http.addContactForm(info,true)
                    Zxios.post('contact/add/form',info,true)
                        .then( res => {
                            console.log(res)
                            // this.chosenContactId = info.id;
                            this.getList()
                            this.showEdit =  false
                            // this.showList = false
                        })
                }
            },
            onDelete(info) {
                // this.list = this.list.filter(item => item.id !== info.id);

                // this.$axios.delete('contact/del',{params: {id: info.id}}) 
                // this.$Http.deleteContact(info,true) 
                Zxios.get('contact/delete', {id: info.id})
                    .then( res => {
                        console.log(res)
                        if (this.chosenContactId === info.id) {
                            this.chosenContactId = null;
                        }
                        this.getList()
                        this.showEdit =  false
                        // this.showList = false
                    })
                
            }
        }
        
    }
</script>

<style lang="less">
// .van-popup{
//     height: 100%;
// }
</style>