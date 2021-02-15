import addBook from './addBookmark';
import deleteBook from './deleteBookmark';
import getBook from './getBookmark';
 


import Bookmark from './Bookmark';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        bookId: string,
        bookmarks: Bookmark
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {

        case "addBookmark":
            return await addBook(event.arguments.bookmarks);
        case "getBookmark":
            return await getBook();
        case "deleteBookmark":
            return await deleteBook(event.arguments.bookId);
         
        default:
            return null;
    }
}