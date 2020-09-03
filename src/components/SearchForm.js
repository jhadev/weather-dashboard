import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Form, Button } from 'react-bootstrap';
import { searchTermState as searchTermAtom } from '../recoil/atoms';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  const inputRef = useRef();

  function submit(e) {
    e.preventDefault();

    setSearchTerm(inputRef.current.value);
  }

  return (
    <Form onSubmit={submit}>
      <Form.Group controlId="searchl">
        <Form.Label>Search for City</Form.Label>
        <Form.Control ref={inputRef} type="text" placeholder="New York" />
        <Form.Text className="text-muted">search for a city.</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SearchForm;
