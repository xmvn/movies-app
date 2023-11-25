import React from 'react'
import { Pagination } from 'antd'

const Footer = ({ error, loading, movieData, page, setPage }) => {
  return (
    <>
      {!error && !loading && (
        <footer>
          <Pagination
            defaultCurrent={page}
            current={movieData.page}
            total={movieData.total_pages}
            pageSize={1}
            onChange={(e) => setPage(e)}
            showQuickJumper={false}
            showSizeChanger={false}
            hideOnSinglePage={true}
          />
        </footer>
      )}
    </>
  )
}

export default Footer
