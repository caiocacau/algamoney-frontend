import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

export const getColumnSorterProps = ({ dataIndex, stateTable, updateStateTable }) => ({
  sorter: () => {

    const { activeSort, columnSort, columnDirectionSort } = stateTable;

    //   console.log("columnSort: " + columnSortState.columnSort + "  dataIndex: " + dataIndex + "  activeSort: " + columnSortState.activeSort)
    if (columnSort !== dataIndex || activeSort === dataIndex) {
      updateStateTable({
        columnSort: dataIndex,
        columnDirectionSort: 'asc',
        activeSort: dataIndex + ',asc'
      })
    } else { // Ordenação de ascendente/descendente
      if (activeSort === dataIndex + ',' + columnDirectionSort) {
        let novoColumnDirectionSort = columnDirectionSort === 'asc' ? 'desc' : 'asc';
        updateStateTable({ columnDirectionSort: novoColumnDirectionSort, activeSort: columnSort + ',' + novoColumnDirectionSort });
      }
    }
  }
  // sortOrder: ({sortDirections}) => {
  //   console.log("sortOrder: " + sortDirections);
  // }
});

export const getColumnSearchProps = ({ dataIndex, type, isAtualizarEventOnChange, updateStateSearch }) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        autoFocus
        placeholder={`Informe o ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys((selectedKeys[0] === undefined) ? [''] : [selectedKeys[0]]);
          if (isAtualizarEventOnChange)
            setSelectedKeys(e.target.value ? [e.target.value] : [])
        }}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        onKeyPress={(e) => {
          isAtualizarEventOnChange = false;
          const key = e.key;
          // Obs.: regExp Validando somente os caracteres que podem ser informados
          if (type === 'number') {
            const regExp = /^[0-9\b]+$/;
            if (regExp.test(key)) {
              isAtualizarEventOnChange = true;
            }
          } else if (type === 'text') {
            const regExp = /[ 0-9a-zA-ZÀ-ü]+/g;
            if (regExp.test(key)) {
              isAtualizarEventOnChange = true;
            }
          } else if (type === 'email') {
            const regExp = /[-_.@0-9a-zA-Z]+/g;
            if (regExp.test(key)) {
              isAtualizarEventOnChange = true;
            }
          } else if (type === 'fone') {
            const regExp = /^[() 0-9\b]+$/;
            if (regExp.test(key)) {
              isAtualizarEventOnChange = true;
            }
          } else if (type === 'data(DD/MM/YYYY)') {
            const regExp = /^[/0-9\b](1)+$/;
            if (regExp.test(key)) { }
            isAtualizarEventOnChange = true;
          }
        }}
        onKeyDown={(e) => {
          const key = e.key;
          if (key === 'Backspace')
            isAtualizarEventOnChange = true;
        }}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex, updateStateSearch)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Pesquisar
        </Button>
        <Button
          type="danger"
          onClick={() => handleReset(setSelectedKeys, selectedKeys, clearFilters, confirm, dataIndex, updateStateSearch)}
          size="small"
          style={{ width: 90 }}>
          Limpar
        </Button>
      </Space>
    </div>
  ),
  filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : ''
  ,
});

const handleSearch = (selectedKeys, confirm, dataIndex, updateStateSearch) => {
  confirm();
  // atualizaColunaBusca(dataIndex, selectedKeys, updateStateSearch);
  eval('updateStateSearch({' + dataIndex + ':' + "'" +  selectedKeys[0] + "'" + '})');
};

const handleReset = (setSelectedKeys, selectedKeys, clearFilters, confirm, dataIndex, updateStateSearch) => {
  selectedKeys[0] = '';
  // atualizaColunaBusca(dataIndex, selectedKeys, updateStateSearch);
  eval('updateStateSearch({' + dataIndex + ':' + "'" +  selectedKeys[0] + "'" + '})');
  setSelectedKeys([]);
  clearFilters();
  confirm();
};

// const atualizaColunaBusca = (dataIndex, selectedKeys, updateStateSearch) => {

  // const test = {
  //   'codigo': 'codigo'
  // }
  // var x = eval(new String(updateStateSearch({ dataIndex: selectedKeys[0] })));
    // eval(x);
  // console.log('dataIndex: ' + dataIndex + "   eval(dataIndex): " + eval(new String(dataIndex)));

  // let x = 'updateStateSearch({' + dataIndex + ':' + "'" +  selectedKeys[0] + "'" + '})';
  // console.log(x);
  // eval(x);

  // updateStateSearch(eval(x));
  // updateStateSearch( { codigo: selectedKeys[0] })

  // if (dataIndex === 'codigo') {
  //   // setCodigo(selectedKeys[0]);
  //   updateStateSearch( { codigo: selectedKeys[0] })
  // } else if (dataIndex === 'nome') {
  //   // setNome(selectedKeys[0]);
  //   updateStateSearch( { nome: selectedKeys[0] })
  // } else if (dataIndex === 'email') {
  //   // setEmail(selectedKeys[0]);
  //   updateStateSearch( { email: selectedKeys[0] })
  // }
// }