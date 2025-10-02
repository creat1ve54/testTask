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
              <tr v-for="(item, idx) in record.records">
                <td>
                  <Textarea
                    class="main__table-textarea"
                    autoResize
                    placeholder="Значение"
                    rows="1"
                    @blur="() => saveRecords(idx)"
                    :maxlength="50"
                    @input="(e) => filterAndUppercase(e, idx)"
                    :value="item.tags"
                  />
                  <!-- :invalid="record.tags == '' && record.isError" -->
                </td>
                <td>
                  <Select
                    v-model="item.type"
                    :options="types"
                    optionLabel=""
                    class="main__table-select"
                    @change="() => onChangeType(item.type, idx)"
                  />
                </td>
                <td :colspan="item.password === null && '2'">
                  <InputText
                    class="main__table-input"
                    name="login"
                    type="text"
                    placeholder="Значение"
                    v-model="item.login"
                    :maxlength="100"
                    @blur="() => saveRecords(idx)"
                    :invalid="item.login == '' && item.isError"
                  />
                </td>
                <td v-if="item.password !== null">
                  <Password
                    v-model="item.password"
                    toggleMask
                    style="font-size: 20px"
                    @blur="() => saveRecords(idx)"
                    placeholder="Пароль"
                    :maxlength="100"
                    :invalid="item.password == '' && item.isError"
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

  const filterAndUppercase = (event, idx) => {
    let value = event.target.value;
    record.updateTagsFunc(idx, value);
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

      th {
        // width: 100%;
        &:nth-child(1) {
          width: 270px;
        }
        &:nth-child(2) {
          width: 270px;
        }
        &:nth-child(3) {
          width: 270px;
        }
        &:nth-child(4) {
          width: 270px;
        }
        &:nth-child(5) {
          width: 62px;
        }
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
