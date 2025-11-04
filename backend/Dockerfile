# Etapa 1: build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia tudo e restaura dependências
COPY . .
RUN dotnet restore
RUN dotnet build -c Release -o /app/build

# Publica o app
RUN dotnet publish src/Api -c Release -o /app/publish

# Etapa 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expõe a porta
EXPOSE 5088

ENTRYPOINT ["dotnet", "Api.dll"]
