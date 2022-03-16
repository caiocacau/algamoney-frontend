import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Space, Row, Col } from 'antd';

export const getColumnSorterProps = ({ dataIndex, stateSort, updateStateSort, atualizaSortR, setAtualizaSortR, totalElements }) => {

  const { activeSort, columnSort, xcolumnDirectionSort } = stateSort;
  // console.log('total de elementos: ', totalElements);
  // console.log("atualizaSortR: ", atualizaSortR, "  columnSort: " + columnSort + "  dataIndex: " + dataIndex + "  activeSort: " + activeSort + "  xcolumnDirectionSort: " + xcolumnDirectionSort)

  if (totalElements === 0 || totalElements > 1) {
    return {
      sorter: () => {

        if (atualizaSortR === 'N') {
          // setAtualizaSortR('S');
          setAtualizaSortR(null);
        } else {
          if (columnSort !== dataIndex || xcolumnDirectionSort === null) {
            updateStateSort({
              columnSort: dataIndex,
              xcolumnDirectionSort: 'ascend',
              activeSort: dataIndex + ',asc'
            })
          } else { // Ordenação de ascendente/descendente
            if (activeSort + 'end' === dataIndex + ',' + xcolumnDirectionSort) {
              let newColumnDirectionSortAbreviado = xcolumnDirectionSort === 'ascend' ? 'desc' : 'asc';
              let newColumnDirectionSort = xcolumnDirectionSort === 'ascend' ? 'descend' : 'ascend';
              updateStateSort({
                columnSort: dataIndex,
                xcolumnDirectionSort: newColumnDirectionSort,
                activeSort: columnSort + ',' + newColumnDirectionSortAbreviado
              });
            }
          }
        }
      }
    }
  } else {
    return {}
  }

};

// export const getColumnSorterProps = ({ dataIndex, stateSort, updateStateSort, atualizaSortR, setAtualizaSortR, totalElements }) => ({

//     sorter: () => {

//       const { activeSort, columnSort, xcolumnDirectionSort } = stateSort;

//       // console.log("atualizaSortR: ", atualizaSortR, "  columnSort: " + columnSort + "  dataIndex: " + dataIndex + "  activeSort: " + activeSort + "  xcolumnDirectionSort: " + xcolumnDirectionSort)
//       if (atualizaSortR === 'N') {
//         setAtualizaSortR('S');
//       } else {
//         if (columnSort !== dataIndex || xcolumnDirectionSort === null) {
//           updateStateSort({
//             columnSort: dataIndex,
//             xcolumnDirectionSort: 'ascend',
//             activeSort: dataIndex + ',asc'
//           })
//         } else { // Ordenação de ascendente/descendente
//           if (activeSort + 'end' === dataIndex + ',' + xcolumnDirectionSort) {
//             let newColumnDirectionSortAbreviado = xcolumnDirectionSort === 'ascend' ? 'desc' : 'asc';
//             let newColumnDirectionSort = xcolumnDirectionSort === 'ascend' ? 'descend' : 'ascend';
//             updateStateSort({
//               columnSort: dataIndex,
//               xcolumnDirectionSort: newColumnDirectionSort,
//               activeSort: columnSort + ',' + newColumnDirectionSortAbreviado
//             });
//           }
//         }
//       }
//     }
// });

const CheckboxGroup = Checkbox.Group;
export const getColumnSearchOptionsProps = ({ dataIndexObjectList, updateStateSearch }) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, filters }) => (
    <div style={{ padding: 8 }}>
      <CheckboxGroup
        style={{ width: '100%' }}
        value={selectedKeys?.map(item => item.value)}
        // value={selectedKeys && selectedKeys.length > 0 ? (selectedKeys.map(item => item.value)) : (currentValues && currentValues.length > 0 ? currentValues.map(item => item) : null)}
        onChange={(e) => {
          // console.log('curr', currentValues?.map(curr => curr))
          setSelectedKeys(filters.filter(item => e.includes(item.value)))
        }} >
        {filters?.map((item) =>
          <Row key={item.value}>
            <Col span={12}>
              <Checkbox value={item.value}>{item.text}</Checkbox>
            </Col>
          </Row>
        )}
      </CheckboxGroup>
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearchOptions(selectedKeys, confirm, dataIndexObjectList, updateStateSearch)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Pesquisar
        </Button>
        <Button
          type="danger"
          onClick={() => handleResetOptions(setSelectedKeys, selectedKeys, clearFilters, confirm, dataIndexObjectList, updateStateSearch)}
          icon={<ClearOutlined />}
          size="small"
          style={{ width: 90 }}>
          Limpar
        </Button>
      </Space>
    </div>
  ),
  filterIcon: filtered => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
});

const handleSearchOptions = (selectedKeys, confirm, dataIndexObjectList, updateStateSearch) => {
  const items = selectedKeys.map(item => { return { value: item.value } });

  confirm();

  if (dataIndexObjectList === "ativos") {
    const newObj = { ativos: items }
    updateStateSearch(newObj)
  }
};

const handleResetOptions = (setSelectedKeys, selectedKeys, clearFilters, confirm, dataIndexObjectList, updateStateSearch) => {
  selectedKeys[0] = [];
  if (dataIndexObjectList === "ativos") {
    const newObj = { ativos: selectedKeys[0] }
    updateStateSearch(newObj)
  }

  setSelectedKeys([]);
  clearFilters();
  confirm();
};

export const getColumnSearchProps = ({ dataIndex, type, isAtualizarEventOnChange, updateStateSearch }) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        autoFocus
        placeholder={`Informe o ${dataIndex}`}
        // value={selectedKeys[0] || currentValue}
        value={selectedKeys[0]}
        onChange={(e) => {
          // setSelectedKeys((selectedKeys[0] === undefined) ? [] : [selectedKeys[0]]);
          setSelectedKeys((selectedKeys[0] === undefined) ? [''] : [selectedKeys[0]]);
          if (isAtualizarEventOnChange) {
            // console.log('e.target.value: ', e.target.value === '');
            // console.log('currentValue: ', currentValue);
            // if (e.target.value === '') {
            //   selectedKeys[0] = '';
            //   setSelectedKeys([]);
            // } else {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            // }
          }
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
          onClick={() => handleSearch(selectedKeys, setSelectedKeys, clearFilters, confirm, dataIndex, updateStateSearch)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Pesquisar
        </Button>
        <Button
          type="danger"
          onClick={() => handleReset(setSelectedKeys, selectedKeys, clearFilters, confirm, dataIndex, updateStateSearch)}
          icon={<ClearOutlined />}
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

const handleSearch = (selectedKeys, setSelectedKeys, clearFilters, confirm, dataIndex, updateStateSearch) => {
  // console.log('aqui selectedKeys: ', selectedKeys);
  if (selectedKeys === []) {
    handleReset(setSelectedKeys, selectedKeys, clearFilters, confirm, dataIndex, updateStateSearch);
  } else {
    // console.log('aqui 1 selectedKeys[0]', selectedKeys[0]);
    if (dataIndex === "codigo") {
      updateStateSearch({ codigo: selectedKeys[0] !== undefined ? selectedKeys[0] : '' });
    }
    if (dataIndex === "nome") {
      updateStateSearch({ nome: selectedKeys[0] !== undefined ? selectedKeys[0] : ''})
    }
    if (dataIndex === "email") {
      updateStateSearch({ email: selectedKeys[0] !== undefined ? selectedKeys[0] : '' })
    }
    confirm();
    // eval('updateStateSearch({' + dataIndex + ':' + "'" + selectedKeys[0] + "'" + '})');
  }
};

const handleReset = (setSelectedKeys, selectedKeys, clearFilters, confirm, dataIndex, updateStateSearch) => {
  selectedKeys[0] = '';
  if (dataIndex === "codigo") {
    updateStateSearch({ codigo: selectedKeys[0] });
  }
  if (dataIndex === "nome") {
    updateStateSearch({ nome: selectedKeys[0] })
  }
  if (dataIndex === "email") {
    updateStateSearch({ email: selectedKeys[0] })
  }
  // eval('updateStateSearch({' + dataIndex + ':' + "'" + selectedKeys[0] + "'" + '})');
  setSelectedKeys([]);
  clearFilters();
  confirm();
};