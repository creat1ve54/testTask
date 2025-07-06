import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Password } from "primevue";
import type { IData, IType } from "@/model/model";

export const useRecordStore = defineStore("counter", () => {
  const records = ref([] as Array<IData>);

  function addRecordFunc() {
    const data: IData = {
      tags: "",
      type: "Локальная",
      login: "",
      password: "",
      isError: false,
    };

    records.value.push(data);
  }

  function removeRecordFunc(idx: number) {
    records.value.splice(idx, 1);

    localStorage.setItem("records", JSON.stringify(records.value));
  }

  function onInputFunc(text: string) {}

  function changeTypeFunc(type: string, idx: number) {
    records.value[idx].type = type;

    if (type == "LDAP") {
      records.value[idx].password = null;
    } else {
      records.value[idx].password = "";
    }

    saveRecordsFunc(idx);
  }

  const saveRecordsFunc = (idx) => {
    const saveData = [...records.value];

    let isErrorPassword = false;

    if (records.value[idx].type === "LDAP") {
      isErrorPassword = false;
    } else {
      isErrorPassword = records.value[idx].password === "";
    }

    if (
      records.value[idx].tags.trim() === "" ||
      records.value[idx].login.trim() === "" ||
      isErrorPassword
    ) {
      records.value[idx].isError = true;
    } else {
      records.value[idx].isError = false;

      // Преобразуем строку тегов в массив перед сохранением
      saveData[idx].tags = saveData[idx].tags
        .split(";")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag !== "");

      localStorage.setItem("records", JSON.stringify(saveData));
      getRecordsFunc(); // Обновляем данные после сохранения
    }
  };

  const getRecordsFunc = () => {
    const storedRecords = JSON.parse(localStorage.getItem("records"));

    if (storedRecords) {
      records.value = storedRecords.map((record: IData) => {
        // Если tags — массив, то объединяем его в строку через ;
        if (Array.isArray(record.tags)) {
          record.tags = record.tags.join("; ");
        }
        return record;
      });
    }
  };

  return {
    records,
    addRecordFunc,
    changeTypeFunc,
    removeRecordFunc,
    onInputFunc,
    saveRecordsFunc,
    getRecordsFunc,
  };
});
