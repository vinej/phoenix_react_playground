defmodule PhoenixReactPlayground.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset


  schema "companies" do
    field :code, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :code])
    |> validate_required([:name, :code])
  end
end
