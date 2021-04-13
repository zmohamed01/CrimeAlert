class AddLongitudeToReports < ActiveRecord::Migration[5.2]
  def change
    add_column :reports, :longitude, :float
  end
end
