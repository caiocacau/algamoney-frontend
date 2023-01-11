import style from './styles.module.css';

const Pagination = ({ page, activePageSize, onPageChange, onPageSizeChange }) => {

    return (
        <div className="row d-flex justify-content-center mt-2">
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${style.pageItem} ${page.first || page.number === 1 ? `${style.pageItemNone}` : ''} `}>
                        <button className={`page-link ${style.pageLink} ${style.caracteres}`} onClick={() => onPageChange(page.number - 1)}>&#60;</button>
                    </li>
                    <li className={`page-item ${style.pageItem} ${page.first ? `disabled ${style.pageItemNone}` : ''} `}>
                        <button className={`page-link ${style.pageLink}`} onClick={() => onPageChange(0)}>1</button>
                    </li>
                    <li className={`page-item ${style.pontinhos} ${style.pageItem} ${(page.number + 1) > 2 ? '' : `${style.pageItemNone}`} `}>
                        ...
                    </li>
                    <li className={`page-item ${style.pageItem} disabled`}>
                        <span className={`page-link ${style.pageLink} ${style.pageLinkPaginaAtual}`}>{page.number + 1}</span>
                    </li>
                    <li className={`page-item ${style.pontinhos} ${style.pageItem} ${(page.number + 1) < page.totalPages - 1 ? '' : `${style.pageItemNone}`} `}>
                        ...
                    </li>
                    <li className={`page-item ${style.pageItem} ${page.last ? `disabled ${style.pageItemNone}` : ''} `}>
                        <button className={`page-link ${style.pageLink}`} onClick={() => onPageChange(page.totalPages - 1)}>{page.totalPages}</button>
                    </li>
                    <li className={`page-item ${style.pageItem} ${page.last || page.number + 1 >= page.totalPages - 1 ? `${style.pageItemNone}` : ''} `}>
                        <button className={`page-link ${style.pageLink} ${style.caracteres}`} onClick={() => onPageChange(page.number + 1)}>&#62;</button>
                    </li>
                    <li className={`page-item`}>
                        <select className={`page-link ${style.pageLink} ${style.antSelectSelector}`}
                            value={activePageSize}
                            onChange={(e) => onPageSizeChange(e.target.value)}>
                            <option value={6}>6 / página</option>
                            <option value={10}>10 / página</option>
                            <option value={15}>15 / página</option>
                            <option value={20}>20 / página</option>
                            <option value={50}>50 / página</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;