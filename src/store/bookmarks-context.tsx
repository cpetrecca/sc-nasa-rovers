"use client";
import React from "react";
import { useState, useEffect } from "react";

const LOCALSTORAGENAME = "bookmarks";

type searchParams = {
  solDate: string;
  selectedCamera: string;
  selectedRover: string;
  page: number;
};

type IBookmarkContext = {
  bookmarks: searchParams[];
  addBookmark: (searchParams: searchParams) => void;
  removeBookmark: (searchParams: searchParams) => void;
};

const retrieveStoredBookmarks = () => {
  let storedBookmarksHelper: searchParams[] = [];
  const storedBookmarks = localStorage.getItem(LOCALSTORAGENAME);
  console.log(storedBookmarks);
  if (storedBookmarks) storedBookmarksHelper = JSON.parse(storedBookmarks);
  return storedBookmarksHelper;
};

type Props = {
  children?: React.ReactNode;
};
const BookmarkContext = React.createContext<IBookmarkContext>({
  bookmarks: [],
  addBookmark: (searchParams: searchParams) => {},
  removeBookmark: (searchParams: searchParams) => {},
});

export const BookmarksContextProvider: React.FC<Props> = (props) => {
  //useEffect to make sure the component is mounted and has access to localstorage
  useEffect(() => {
    const storedBookmarks: searchParams[] = retrieveStoredBookmarks();
    setBookmarks(storedBookmarks);
  }, []);

  const [bookmarks, setBookmarks] = useState<searchParams[]>([]);

  const addBookmark = (searchParam: searchParams) => {
    console.log("here");
    setBookmarks((prev) => [...prev, searchParam]);
    localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(bookmarks));
  };

  const removeBookmark = (searchParam: searchParams) => {
    const newBookmarks = bookmarks.filter(
      (bookmarks) =>
        bookmarks.selectedCamera !== searchParam.selectedCamera ||
        bookmarks.selectedRover !== searchParam.selectedRover ||
        bookmarks.solDate !== searchParam.solDate
    );
    localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {props.children}
    </BookmarkContext.Provider>
  );
};

//bookmark context as default export for createContext

export default BookmarkContext;
