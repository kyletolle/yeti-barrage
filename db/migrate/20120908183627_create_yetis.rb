class CreateYetis < ActiveRecord::Migration
  def change
    create_table :yetis do |t|
      t.string :name
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end
