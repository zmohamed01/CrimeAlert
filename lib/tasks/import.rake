require 'csv'

namespace :import do
  desc 'Imports csv data into db'
  task from_csv: :environment do
    csv_text = File.read('lib/data/cities.csv')
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      Place.create!(row.to_hash)
    end
  end
end
