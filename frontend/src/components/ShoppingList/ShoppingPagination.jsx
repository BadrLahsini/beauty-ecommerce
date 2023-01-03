import Pagination from "react-bootstrap/Pagination";

const ShoppingPagination = ({ pages, currentPage, SetcurrentPage }) => {
  var items = [];

  if (pages > 1) {
    items.push(
      <Pagination.First
        key={0}
        onClick={() => {
          SetcurrentPage(1);
        }}
      />
    );
    if (pages < 7) {
      for (let number = 1; number <= pages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => SetcurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      if (currentPage < 3) {
        for (let number = 1; number <= currentPage + 2; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => SetcurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
        items.push(<Pagination.Ellipsis key={1001} disabled />);
        items.push(
          <Pagination.Item
            key={pages}
            active={pages === currentPage}
            onClick={() => SetcurrentPage(pages)}
          >
            {pages}
          </Pagination.Item>
        );
      }
      if (currentPage <= pages - 3 && currentPage >= 3) {
        console.log("under 33");

        items.push(
          <Pagination.Item
            active={currentPage === 1}
            key={1}
            onClick={() => SetcurrentPage(1)}
          >
            {1}
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis key={1101} disabled />);
        console.log(items);

        for (
          let number = currentPage - 1;
          number <= currentPage + 1;
          number++
        ) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => SetcurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
        items.push(<Pagination.Ellipsis key={1011} disabled />);
        items.push(
          <Pagination.Item
            key={pages}
            active={pages === currentPage}
            onClick={() => SetcurrentPage(pages)}
          >
            {pages}
          </Pagination.Item>
        );
      }
      if (currentPage > pages - 3) {
        console.log("more 33#");

        items.push(
          <Pagination.Item
            key={1}
            active={currentPage === 1}
            onClick={() => SetcurrentPage(1)}
          >
            {1}
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis key={1021} disabled />);
        for (let number = currentPage - 2; number <= pages; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => SetcurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
      }
    }
    items.push(
      <Pagination.Last
        key={103}
        onClick={() => {
          SetcurrentPage(pages);
        }}
      />
    );
  }
  return <Pagination className="shopping-pagination">{items}</Pagination>;
};

export default ShoppingPagination;
