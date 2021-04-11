from pymongo import MongoClient

class DBHandler:
    def __init__(self):
        host = 'localhost'
        port = 27017

        self.client = MongoClient(host, int(port))

    def insert_item(self, data, db_name=None, collection_name=None):
        return self.client[db_name][collection_name].insert_one(data).inserted_id

    def find_item(self, condition=None, db_name=None, collection_name=None):
        return self.client[db_name][collection_name].find_one(condition)

    def find_items(self, condition=None, db_name=None, collection_name=None):
        return self.client[db_name][collection_name].find(condition, no_cursor_timeout=True)

    def update_item(self, condition=None, update_value=None, db_name=None, collection_name=None):
        return self.client[db_name][collection_name].update_one(filter=condition, update=update_value, upsert=True)

    def update_items(self, condition=None, update_values=None, db_name=None, collection_name=None):
        return self.client[db_name][collection_name].update_many(filter=condition, update=update_values)

    def delete_item(self, condition=None, db_name=None, collection_name=None):
        return self.client[db_name][collection_name].delete_many(condition)