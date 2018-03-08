defmodule PhoenixReactPlayground.Repo.Migrations.CreateCompanies do
  use Ecto.Migration

  def change do
    create table(:companies) do
      add :name, :string
      add :code, :string

      timestamps()
    end

  end
end
