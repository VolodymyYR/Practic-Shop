using System.Numerics;

public static class Validator
{
    public static string RequiredString(string value, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new Exception($"{fieldName} cannot be empty");
        }
            
        return value;
    }

    public static T RequiredNonNegative<T>(T value, string fieldName) where T : INumber<T>
    {
        if (value < T.Zero)
        {
            throw new Exception($"{fieldName} cannot be negative");
        }

        return value;
    }

    public static T RequiredPositive<T>(T value, string fieldName) where T : INumber<T>
    {
        if (value <= T.Zero)
        {
            throw new Exception($"{fieldName} must be greater than zero");
        }

        return value;
    }
}