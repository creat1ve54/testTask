<template>
  <div class="main">
    <div class="container">
      <div class="main__container">
        <div class="main__header">
          <h1 class="main__title">Учетные записи</h1>
          <Button severity="secondary" label="Save" @click="addRecord">
            <i class="pi pi-plus" style="font-size: 30px"></i>
          </Button>
        </div>
        <div class="main__info">
          <i class="pi pi-question-circle" style="font-size: 30px"></i>
          Для указания нескольких меток одной пары логин/пароль используйте
          разделитель ;
        </div>
        <div class="main__table">
          <table>
            <thead>
              <tr>
                <th>Метки</th>
                <th>Тип записи</th>
                <th>Логин</th>
                <th>Пароль</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, idx) in record.records">
                <td>
                  <Textarea
                    class="main__table-textarea"
                    autoResize
                    placeholder="Значение"
                    rows="1"
                    v-model="record.tags"
                    :invalid="record.tags == '' && record.isError"
                    @blur="() => saveRecords(idx)"
                  />
                </td>
                <td>
                  <Select
                    v-model="record.type"
                    :options="types"
                    optionLabel=""
                    class="main__table-select"
                    @change="() => onChangeType(record.type, idx)"
                  />
                </td>
                <td :colspan="record.password === null && '2'">
                  <InputText
                    class="main__table-input"
                    name="login"
                    type="text"
                    placeholder="Значение"
                    v-model="record.login"
                    @blur="() => saveRecords(idx)"
                    :invalid="record.login == '' && record.isError"
                  />
                </td>
                <td v-if="record.password !== null">
                  <Password
                    v-model="record.password"
                    toggleMask
                    style="font-size: 20px"
                    @blur="() => saveRecords(idx)"
                    placeholder="Пароль"
                    :invalid="record.password == '' && record.isError"
                  />
                </td>
                <td>
                  <Button
                    severity="secondary"
                    variant="text"
                    @click="() => removeRecord(idx)"
                  >
                    <i class="pi pi-trash" style="font-size: 15px"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

import { onMounted, ref } from "vue";
import { Password, Select } from "primevue";
import { useRecordStore } from "./stores/record";

const types = ref(["Локальная", "LDAP"]);

// const selectedType = ref(types.value[0]);

const saveRecords = (idx) => {
  record.saveRecordsFunc(idx);
};

const record = useRecordStore();

const addRecord = () => {
  record.addRecordFunc();
};

// const onInput = (e) => {
//   record.onInputFunc(e.target.text);
// };

const removeRecord = (idx) => {
  record.removeRecordFunc(idx);
};

const onChangeType = (idx, type) => {
  record.changeTypeFunc(idx, type);
};

onMounted(() => {
  record.getRecordsFunc();
});
</script>
<style scoped lang="scss">
.main {
  padding-top: 40px;
  &__header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  &__title {
    font-weight: 700;
    font-size: 30px;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: rgb(225, 234, 236);
    padding: 5px;
    margin-bottom: 20px;
  }

  &__table {
    &-input {
      width: 100%;
    }

    &-textarea {
      width: 100%;
    }

    &-select {
      width: 100%;
    }

    tbody {
      td {
        padding: 20px 10px;
        vertical-align: middle;
      }
    }
  }
}
</style>
