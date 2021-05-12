class NewsController < ApplicationController
  def index
    news= News.new("7f3dca4f47724527b0737614b76299a2")
    @news = news.get_top_headlines(q: "crime")
  end
end
