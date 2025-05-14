import { useSQLiteContext } from "expo-sqlite";

export type createClienteProps = {
  id?: number;
  name: string;s
  email: string;
}

export function useClienteDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<createClienteProp, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO users (name, email) VALUES ($name, $email)",
    );
    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $email: data.email,
      });
      const insertedRowId = result.lastInsertRowId;

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.closeAsync();
    }
  }

  async function searchByName(name: string) {
    try {
      const query = `SELECT * FROM users WHERE name LIKE ?`;

      const response = await database.getAllAsync<createClienteProp>(query, [`%${name}%`]);

      return response
    } catch (error) {
      throw error;   }
    }
  }    


  return { create, searchByName };
}