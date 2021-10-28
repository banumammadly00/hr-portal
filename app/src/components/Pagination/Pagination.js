import React from 'react';
import Pagination from "react-bootstrap/Pagination";

function Paginate(props) {
    const amountPages = Math.ceil(props.count / props.recordSize);
    let next = props.currentPage + 1;
    let prev = props.currentPage - 1

    return (
        amountPages > 1 ?
            <div className="pagination-block flex-vertical-center">
                <Pagination>
                    <Pagination.Prev disabled={props.currentPage === 1 ? true : false} onClick={() => {
                        props.click(props.currentPage - 1)
                    }}/>
                    {
                        props.currentPage !== 1 ?
                            <Pagination.Item active={1 === props.currentPage} onClick={() => {
                                props.click(1)
                            }}>
                                1
                            </Pagination.Item>
                            : ''
                    }
                    {
                        prev - 1 > 1 ?
                            <Pagination.Ellipsis/>
                            : ''
                    }
                    {
                        props.currentPage !== 1 && prev !== 1 ?
                            <Pagination.Item active={props.currentPage === prev} onClick={() => {
                                props.click(prev)
                            }}>
                                {prev}
                            </Pagination.Item>
                            : ''
                    }
                    <Pagination.Item active={props.currentPage} onClick={() => {
                        props.click(props.currentPage)
                    }}>
                        {props.currentPage}
                    </Pagination.Item>
                    {
                        props.currentPage !== amountPages && next !== amountPages ?
                            <Pagination.Item active={props.currentPage + 1 === props.currentPage} onClick={() => {
                                props.click(props.currentPage + 1)
                            }}>
                                {props.currentPage + 1}
                            </Pagination.Item>
                            : ''
                    }
                    {
                        next + 1 < amountPages ?
                            <Pagination.Ellipsis/>
                            : ''
                    }
                    {
                        props.currentPage !== amountPages ?
                            <Pagination.Item active={amountPages === props.currentPage} onClick={() => {
                                props.click(amountPages)
                            }}>
                                {amountPages}
                            </Pagination.Item>
                            : ''
                    }
                    <Pagination.Next disabled={props.currentPage === amountPages ? true : false} onClick={() => {
                        props.click(props.currentPage + 1)
                    }}/>
                </Pagination>
            </div>
            : ''
    )
}

export default Paginate
