class AddDatetimeToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :datetime, :float
  end
end
