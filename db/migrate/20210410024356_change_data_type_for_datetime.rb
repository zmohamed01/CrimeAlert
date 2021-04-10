class ChangeDataTypeForDatetime < ActiveRecord::Migration[5.2]
  def self.up
	change_table :locations do |t|
		t.change :datetime, :float
	end
	end
  
  def self.down
	change_table :locations do |t|
		t.change :datetime, :text
	end
	end
end
