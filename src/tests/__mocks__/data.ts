export const MockedFoldersData = [
  {
    id: "1",
    name: "test folder 1",
    color: "#323232",
  },
  {
    id: "2",
    name: "test folder 2",
    color: "#545454",
  },
];

export const MockedTodosData = [
  {
    id: "1",
    text: "test todo 1",
    done: false,
    folderId: MockedFoldersData[0].id,
  },
  {
    id: "2",
    text: "test todo 2",
    done: false,
    folderId: MockedFoldersData[1].id,
  },
];
