import {
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyBooks = () => {
  const [bookData, setBookData] = useState([]);
  const [query, setQuery] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/books/viewer/?${query}=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookData(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [query]);

  return (
    <>
      <Heading textAlign={"center"}>My Books</Heading>
      <Select
        placeholder="Select Role"
        name="role"
        onChange={(e) => setQuery(e.target.value)}
      >
        <option value="newBook">Show latest Books</option>
        <option value="oldBook">Show Old Books</option>
      </Select>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Genre</Th>
              <Th>Price</Th>
              <Th isNumeric>Published At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!bookData ? (
              <Tr>
                <Th>You have no access to this page</Th>
              </Tr>
            ) : bookData.length == 0 ? (
              <Tr>
                <Th>You don't have your own books</Th>
              </Tr>
            ) : (
              bookData.map((ele) => {
                return (
                  <Tr key={ele._id}>
                    <Td>{ele.title}</Td>
                    <Td>{ele.author}</Td>
                    <Td>{ele.genre}</Td>
                    <Td>{ele.price}</Td>
                    <Td isNumeric> {ele.publishedAt}</Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyBooks;
