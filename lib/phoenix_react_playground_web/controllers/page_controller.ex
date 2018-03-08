defmodule PhoenixReactPlaygroundWeb.PageController do
  use PhoenixReactPlaygroundWeb, :controller

  plug :put_layout, "spa.html"

  def index(conn, _params) do
    render conn, "index.html"
  end
end

